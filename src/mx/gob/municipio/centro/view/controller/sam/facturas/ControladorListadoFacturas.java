package mx.gob.municipio.centro.view.controller.sam.facturas;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayFacturas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sam/facturas/lst_facturas.action")
public class ControladorListadoFacturas extends ControladorBase {

	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	final String STATUS_NUEVA="0"; 
	
	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
		
	@Autowired 
	GatewayFacturas gatewayFacturas;
	
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	
	public ControladorListadoFacturas(){
		
	}
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response) {
		boolean privilegio = this.getPrivilegioEn(this.getSesion().getIdUsuario(), VER_TODAS_LAS_UNIDADES);
		String verUnidad=request.getParameter("verUnidad");
		String idUnidad=request.getParameter("cbodependencia")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		//String estatus=request.getParameter("status")==null ? "0": this.arrayToString(request.getParameterValues("status"),",");
		//String estatus=request.getParameter("status")==null ? STATUS_NUEVA: this.arrayToString(request.getParameterValues("status"),",");
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String beneficiario=request.getParameter("cboprestadorservicio");//beneficiario
		@SuppressWarnings("static-access")
		String cbostatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayFacturas.FAC_STATUS_NUEVO): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		String numped=request.getParameter("txtpedido");
		String numreq=request.getParameter("txtnumreq");
		String num_factura=request.getParameter("txtfactura");
		@SuppressWarnings("static-access")
		String estatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayFacturas.FAC_STATUS_NUEVO): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		
		
		if(privilegio){
			if(request.getParameter("cbodependencia")==null)
				idUnidad = "0";
			if(request.getParameter("cbodependencia")!=null)
				idUnidad = request.getParameter("cbodependencia");
		}
		
		if(!privilegio){
			
			if(request.getParameter("cbodependencia")==null)
				idUnidad = this.getSesion().getClaveUnidad();
			if(request.getParameter("cbodependencia")!=null)
				idUnidad = request.getParameter("cbodependencia");
		}
		
		if(verUnidad!=null&&privilegio)
			idUnidad = this.getSesion().getClaveUnidad();
		
		modelo.put("numfactura", num_factura);
		modelo.put("numped", numped);
		modelo.put("numreq", numreq);
		modelo.put("estatus", estatus);
		modelo.put("idUnidad", idUnidad);
		modelo.put("CVE_BENEFI",cve_benefi );
		modelo.put("beneficiario", beneficiario);
		modelo.put("fechaInicial",(request.getParameter("txtfechaInicial")==null ? "": request.getParameter("txtfechaInicial")));
		modelo.put("fechaFinal",(request.getParameter("txtfechaFinal")==null ? "": request.getParameter("txtfechaFinal")));
		modelo.put("tipo_gto", (request.getParameter("cbotipogasto")==null ? "": request.getParameter("cbotipogasto")));
		//modelo.put("tipo_gto", (request.getParameter("cbostatus")==null ? "": request.getParameter("cbostatus")));
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("cbostatus",cbostatus);
		modelo.put("verUnidad",verUnidad);
		
		//modelo.put("listadoFacturas",this.gatewayFacturas.getListadoFacturas(modelo));
				
		List <Map<String, Object>> lista = this.getListadoFacturas(num_factura, numped, numreq, idUnidad, cve_benefi,estatus , modelo.get("fechaInicial").toString(), modelo.get("fechaFinal").toString(),modelo.get("tipo_gto").toString(), this.getSesion().getEjercicio(), this.getSesion().getIdUsuario(), verUnidad, this.getSesion().getClaveUnidad() , privilegio);
		modelo.put("listadoFacturas",lista);
		modelo.put("CONTADOR", lista.size());
		
		return "sam/facturas/lst_facturas.jsp";
	}
	
	
	public List <Map<String, Object>>getListadoFacturas(String num_factura, String numped, String numreq, String unidad ,String cve_benefi,  String estatus, String fechaInicial, String fechaFinal, String tipo_gto, Integer ejercicio, Integer idUsuario, String  verUnidad, String cve_uniusr,  boolean privilegio){
		return this.gatewayFacturas.getListadoFacturas2(num_factura,unidad, estatus,this.formatoFecha(fechaInicial) , this.formatoFecha(fechaFinal), cve_benefi, tipo_gto, ejercicio,idUsuario, verUnidad, cve_uniusr, numped, numreq, privilegio);
	}
	
	
	public void cancelarFacturas(final Long[] idFacturas){
		gatewayFacturas.cancelarFacturas(idFacturas, this.getSesion().getIdUsuario(), this.getSesion().getEjercicio());
	}
	
	public List<Map<String, Object>> getListaAnexosArchivosFactura(Long cve_factura)
	{
		return gatewayFacturas.getListaAnexosArchivosFacturas(cve_factura);
	}
	
	@ModelAttribute("unidadesAdmiva")
	public List<Map<String, Object>> getUnidadesAdmivas(){
	   	return gatewayUnidadAdm.getUnidadAdmTodos();	
	}
	
	@ModelAttribute("tipodeGasto")
    public List<Map<String, Object>> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	
	@ModelAttribute("beneficiarios")
	public List<Map<String, Object>> getBeneficiarios(){
		return gatewayBeneficiario.getListaBeneficiarios();
	}
	
	public List<Map<String, Object>> getMovimientosAjustadosFactura(Long cve_factura)
	{
		return gatewayFacturas.getMovimientosAjustadosFactura(cve_factura);
	}
	
	public List<Map<String, Object>> getConceptosFactura(Long cve_factura)
	{
		return gatewayFacturas.getDetallesFactura(cve_factura);
	}
	
	public void guardarAjusteFacturaPeredo(Long id_sam_mod_comp, Long cve_factura, int idProyecto, String clv_partid, String fecha, Double importe)
	{
		gatewayFacturas.guardarAjusteFacturaPeredo(id_sam_mod_comp, cve_factura, idProyecto, clv_partid, fecha, importe);
	}
	
	public void eliminarConceptoAjusteFactura(Long id_sam_mod_comp)
	{
		gatewayFacturas.eliminarConceptoAjusteFactura(id_sam_mod_comp);
	}
}
