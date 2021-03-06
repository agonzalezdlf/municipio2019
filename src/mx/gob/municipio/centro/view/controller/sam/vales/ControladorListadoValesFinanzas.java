/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.vales;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.GatewayVales;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/vales/lista_vales_finanzas.action")

public class ControladorListadoValesFinanzas extends ControladorBase {

	public ControladorListadoValesFinanzas(){}
		
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
	
	@Autowired
	GatewayVales gatewayVales;
	
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST} )  
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		Boolean privilegio = false;
		String unidad=request.getParameter("cbodependencia")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		String estatus=request.getParameter("status")==null ? gatewayVales.getEstatusPendiente().toString(): request.getParameter("status").toString();
		String fechaIni=request.getParameter("fechaInicial");
		String fechaFin=request.getParameter("fechaFinal");
		String tipoGasto=request.getParameter("cbotipogasto");
		String numvale = request.getParameter("txtnumvale");
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String beneficiario=request.getParameter("cboprestadorservicio");//beneficiario
		String numcontrato = request.getParameter("txtcontrato");
		String cbostatus = String.valueOf(request.getParameter("cbostatus")==null ? 1 : (String) request.getParameter("cbostatus"));
		
		modelo.put("cbostatus",cbostatus) ;
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("idUnidad", unidad);
		modelo.put("ejercicio",this.getSesion().getEjercicio());
		modelo.put("txtnumvale", numvale);
		modelo.put("txtcontrato", numcontrato);
		modelo.put("fechaInicial",fechaIni);
		modelo.put("fechaFinal",fechaFin);
		modelo.put("status",estatus);
		
		modelo.put("cbotipogasto",tipoGasto );
		modelo.put("idUnidadSes",this.getSesion().getClaveUnidad());
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("CVE_BENEFI",cve_benefi );
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		
		modelo.put("vales",this.getListadoVales(unidad, cbostatus, cve_benefi, numvale, numcontrato, fechaIni,fechaFin,this.getSesion().getEjercicio(),tipoGasto,this.getSesion().getIdUsuario(), privilegio));		
	    return "sam/vales/lista_vales_finanzas.jsp";
	}
	
	@ModelAttribute("unidadesAdmiva")
    public List<Map<String, Object>> getUnidades(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }
		
	@ModelAttribute("tipodeGasto")
    public List<Map<String, Object>> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	
	@ModelAttribute("beneficiarios")
	public List<Map<String, Object>>getBeneficiarios(){
		return (List<Map<String, Object>>) gatewayBeneficiario.getListaBeneficiarios();
	}
	
	public List <Map<String, Object>>getListadoVales(String unidad, String  estatus , String clv_benefi, String numvale, String numcontrato, String fechaInicial, String fechaFinal , Integer ejercicio, String tipoGasto, Integer idUsuario, Boolean privilegio){
		return this.gatewayVales.getListaDeValesPorEjemplo(unidad, estatus , clv_benefi, numvale, numcontrato, this.formatoFecha(fechaInicial), this.formatoFecha(fechaFinal) , ejercicio, tipoGasto, idUsuario, "SI", privilegio);
	}
	
}
