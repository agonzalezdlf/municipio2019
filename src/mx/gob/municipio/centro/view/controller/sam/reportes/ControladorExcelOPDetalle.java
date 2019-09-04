package mx.gob.municipio.centro.view.controller.sam.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import mx.gob.municipio.centro.model.gateways.sam.GatewayExcelOPDetalle;
import mx.gob.municipio.centro.model.gateways.sam.GatewayOrdenDePagos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayReporteOPDetalle;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/reportes/lst_reporteexcelOPDetalle.action")
public class ControladorExcelOPDetalle extends ControladorBase{
	
	private static Logger log = Logger.getLogger(ControladorExcelReporte.class.getName());
	public final static  int VER_TODAS_LAS_UNIDADES = 25;

	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	GatewayOrdenDePagos gatewayOrdenDePagos;
	
	@Autowired
	GatewayReporteOPDetalle gatewayReporteOPDetalle;

	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
	
	public ControladorExcelOPDetalle(){		
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public ModelAndView requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response) {
		
		boolean privilegio = this.getPrivilegioEn(this.getSesion().getIdUsuario(), VER_TODAS_LAS_UNIDADES);
		
		String idUnidad = request.getParameter("ridunidad") == null ? this.getSesion().getClaveUnidad() : request.getParameter("ridunidad");
		Integer tipogasto = request.getParameter("ridrecurso") != null ? Integer.parseInt(request.getParameter("ridrecurso")) : 0;
		//Integer idproyecto = request.getParameter("rproyecto") != null ? Integer.parseInt(!request.getParameter("rproyecto").toString().equals("") ? request.getParameter("txtproyecto").toString() : "0") : 0;
		//String idpartida = request.getParameter("rpartida") != null ? request.getParameter("rpartida") : "";
		String cbostatus=request.getParameter("rstatus")==null ? Integer.toString(gatewayOrdenDePagos.OP_ESTADO_NUEVA): this.arrayToString(request.getParameterValues("rstatus"),",");//Componente status
		//String estatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayOrdenDePagos.OP_ESTADO_EN_EDICION): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		Integer clv_capitulo = request.getParameter("rcapitulo") != null ? Integer.parseInt(!request.getParameter("rcapitulo").toString().equals("") ? request.getParameter("rcapitulo").toString() : "0") : 0;
		String mes_OP = request.getParameter("rmes") == null ? "0" : request.getParameter("rmes");
		Map<String, Object> MesActual = this.GetMesActual();

		modelo.put("mes_OP", mes_OP);
		modelo.put("idUnidad", idUnidad);
		modelo.put("nombreUnidad", this.getSesion().getUnidad());
		modelo.put("idtipogasto", tipogasto);
		//modelo.put("idproyecto", (idproyecto == 0 ? "" : idproyecto));
		//modelo.put("idpartida", idpartida);
		modelo.put("idcapitulo", clv_capitulo);
		//modelo.put("estatus", estatus);
		modelo.put("cbostatus",cbostatus);
		//modelo.put("mesActivo", MesActual.get("DESCRIPCION"));
		
		modelo.put("listadomovimientos", this.gatewayReporteOPDetalle.getreparametros(modelo));
		
	return new ModelAndView(new GatewayExcelOPDetalle(),"modelo", modelo);
	}

	@ModelAttribute("unidadesAdmiva")
	public List<Map<String, Object>> getUnidadesAdmivas() {
		return gatewayUnidadAdm.getUnidadAdmTodos();
	}

	@ModelAttribute("tipodeGasto")
	public List<Map<String, Object>> getTiposDeGasto() {
		return gatewayPlanArbit.getTipodeGasto();
	}

	@ModelAttribute("capitulos")
	public List<Map<String, Object>> getCapitulos() {
		return gatewayUnidadAdm.getCapitulos();
	}
}
